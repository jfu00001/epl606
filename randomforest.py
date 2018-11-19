import mysql.connector
import pandas

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor as RF
from sklearn.externals import joblib
#from sklearn.metrics import mean_squared_error as mse

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
        if i<0.2:
            target.append(0)
        elif i>0.2 and i<0.4:
            target.append(0.25)
        elif i>0.4 and i<0.6:
            target.append(0.5)
        elif i>0.6 and i<0.8:
            target.append(0.75)
        else:
           target.append(1)
      
    return target

def train(parkingID):
    dataset = getData(int(parkingID))
    normalize(dataset)
    targetSet = createAvailabilityGroups(dataset)

    del dataset['space']
    trainSet,testSet,trainTarget,testTarget = train_test_split(dataset,targetSet,test_size=0.4,random_state=0)
    
    model = RF(n_estimators=100, random_state=0)  
    estimator = model.fit(trainSet,trainTarget)
    prediction = estimator.predict(testSet)	
    #error = mse(prediction,testTarget)
    #print "MSE for parking %d: %f" % (int(parkingID),  error)
	
    # store estimator
    filename = "%d.joblib" % int(parkingID)
    joblib.dump(estimator, filename) 

# redo learning daily at 4 am
# schedule.every().day.at("04:00").do(train,2) #extraTree
schedule.every().day.at("04:00").do(train,4)
schedule.every().day.at("04:00").do(train,5)

while True:
	schedule.run_pending()
	time.sleep(60)