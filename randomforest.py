import mysql.connector
import pandas

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor as RF
from sklearn.externals import joblib
from sklearn.metrics import mean_squared_error as mse

import schedule
import time
from datetime import datetime

# get data from server
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

# reduce target in 5 option
def createAvailabilityGroups(data):
    target=[]
    for i in data['space']:
        if i<0.2:
            target.append(0)
        elif i>=0.2 and i<0.4:
            target.append(0.25)
        elif i>=0.4 and i<0.6:
            target.append(0.5)
        elif i>=0.6 and i<0.8:
            target.append(0.75)
        elif i>=0.8:
           target.append(1)
     
    return target

def train(parkingID):
    dataset = getData(int(parkingID))

    #set targets
    target = pandas.DataFrame()
    target['space'] = dataset['space']
    del dataset['space']
    targets = pandas.DataFrame(MinMaxScaler().fit_transform(target),columns=target.columns)
    targetSet = createAvailabilityGroups(targets)

	# exclude day,date from timestamp and normalize based on 24h
    for x in xrange(0,len(dataset['timestamp'])):
        ts = int(dataset['timestamp'][x])
        h = datetime.utcfromtimestamp(ts).strftime('%H')
        m = datetime.utcfromtimestamp(ts).strftime('%M')
        dataset['timestamp'][x] = str(int(h)*60+int(m))
		
    # create train and test sets       
    trainSet,testSet, trainTarget,testTarget = train_test_split(dataset, targetSet, test_size=0.4,random_state=0)
        
    #train using RandomForest  
    model = RF(n_estimators=10, random_state=0)  
    estimator = model.fit(trainSet,trainTarget)

    ## for debug
    #prediction = estimator.predict(testSet)
    #error = mse(prediction,testTarget)
    #print "MSE for parking %d: %f" % (int(parkingID),  error)

    # store model
    filename = "parking%d_model.joblib" % int(parkingID)
    joblib.dump(estimator, filename) 
	
    f = open("randomforesttrain.log","a+")
    f.write(str(datetime.now())+"\n")
    f.close
   
# train(4)
# train(5)

schedule.every().day.at("02:00").do(train,4)
schedule.every().day.at("02:10").do(train,5)

while True:
    schedule.run_pending()
    time.sleep(60) # wait one minute