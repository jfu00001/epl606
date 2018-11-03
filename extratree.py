import mysql.connector
import pandas

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error as mse
from sklearn.model_selection import train_test_split
from sklearn.ensemble import ExtraTreesRegressor as ET
from sklearn.externals import joblib

import schedule
import time

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

def train(parkingID):
    dataset = getData(int(parkingID))
    normalize(dataset)
    targetSet = createAvailabilityGroups(dataset)

    del dataset['space']
    trainSet,testSet,trainTarget,testTarget = train_test_split(dataset,targetSet,test_size=0.4,random_state=0)
    
    model = ET(n_estimators=100, random_state=0)  
    estimator = model.fit(trainSet,trainTarget)
    prediction = estimator.predict(testSet)	
    error = mse(prediction,testTarget)
    print "MSE for parking %d: %f" % (int(parkingID),  error)
	
    # store estimator
    filename = "%d.joblib" % int(parkingID)
    joblib.dump(estimator, filename) 

# for each parkingID
train(2)
train(4)
train(5)

# function for userInput
def predict(parkingID, timestamp):
    filename = "%d.joblib" % int(parkindID)
    estimator = joblib.load(filename)
    prediction = estimator.predict(timestamp)
    error = mse(prediction,testTarget)
    print "MSE for parking %d: %f" % (int(parkingID),  error)
    return prediction

# redo learning daily at 4 am
# schedule.every().day.at("04:00").do(train,2)
# schedule.every().day.at("04:00").do(train,4)
# schedule.every().day.at("04:00").do(train,5)

# while True:
#    schedule.run_pending()
#    time.sleep(60) # wait a minute
