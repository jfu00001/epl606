import mysql.connector
import pandas

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error as mse

import sklearn.model_selection as model_selection
import sklearn.ensemble as ensemble
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
import sklearn.linear_model as linear_model
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

def getData(parkingID):
    mydb = mysql.connector.connect(
        host="localhost",
		user="ubuntu",
		passwd="epl606",
		database="parking"
    )

    query = "SELECT * FROM data WHERE parking_id = " + str(parkingID) 
    data = pandas.read_sql(query,mydb)
    del data['parking_id']
    mydb.close()
    return data

def normalize(data):
   scaler = MinMaxScaler()
   scaler.fit(data)
   scaler.transform(data)

def createAvailabilityGroups(data):
    target=[]
    for i in data['space']:
        if i<0.33:
            target.append(0)
        elif i>0.66:
            target.append(1)
        else:
           target.append(0.5)
    
    return target

def evaluate(parkingID):
    dataset = getData(int(parkingID))
    #print(dataset)
    normalize(dataset)
    #print(dataset)
    targetSet = createAvailabilityGroups(dataset)
    #print(targetSet)
    del dataset['space']

    trainSet,testSet,trainTarget,testTarget = model_selection.train_test_split(dataset,targetSet,test_size=0.4,random_state=0)
    
    # Spot Check Algorithms
    models = []
    models.append(('ARD', linear_model.ARDRegression()))   
    models.append(('RidgeCV', linear_model.RidgeCV(cv=model_selection.KFold(n_splits=10,random_state=0))))
    models.append(('BayisionRidge', linear_model.BayesianRidge()))
    models.append(('Huber', linear_model.HuberRegressor()))
    models.append(('Lars', linear_model.LarsCV(cv=model_selection.KFold(n_splits=10,random_state=0))))
    models.append(('Lasso', linear_model.LassoCV(cv=model_selection.KFold(n_splits=10,random_state=0))))
    models.append(('Linear', linear_model.LinearRegression()))
    models.append(('Logistic', linear_model.LogisticRegression())) 
    models.append(('AdaBoost', ensemble.AdaBoostRegressor()))
    models.append(('ExtraTree', ensemble.ExtraTreesRegressor(n_estimators=100, random_state=0)))
    models.append(('RandomForest', ensemble.RandomForestRegressor(n_estimators=100, random_state=0)))
    models.append(('PassiveAgressive', linear_model.PassiveAggressiveRegressor(random_state=0)))
    models.append(('GaussionNB', GaussianNB()))
    models.append(('SVM', SVC()))
    models.append(('LDA', LinearDiscriminantAnalysis()))

    # evaluate each model in turn
    results = []
    names = []
    print "MSE for parking %d" % int(parkingID)
    print "-----------------"
    best=""
    bestMSE=100
    for name, model in models:
        estimator = model.fit(trainSet,trainTarget)
	# testSet contains timestamps, for user request replace testSet with user input
        prediction = estimator.predict(testSet)	
        error = mse(prediction,testTarget)
        print "%s: %f" % (name,error)
        if error < bestMSE:
            bestMSE=error
            best=name

    print"\nBest: %s\t\tMSE: %f\n" %(best,bestMSE)

# for each parkingID
evaluate(2)
evaluate(4)
evaluate(5)
