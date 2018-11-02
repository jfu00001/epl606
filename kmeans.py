import mysql.connector
import pandas
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics import mean_squared_error as mse
from sklearn import cross_validation

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
    #print(dataset)
    normalize(dataset)
    #print(dataset)
    targetSet = createAvailabilityGroups(dataset)
    #print(targetSet)

    del dataset['space'] 

    trainSet,testSet,trainTarget,testTarget = cross_validation.train_test_split(dataset,targetSet,test_size=0.4,random_state=0)
    
    kmeans = KMeans(n_clusters=3,random_state=0)
    kmeans.fit(trainSet)
    predictions = kmeans.predict(testSet)
    print "Kmeans MSE for parking %d: %f" % (int(parkingID), mse(predictions, testTarget))


train(2)
train(4)
train(5)
