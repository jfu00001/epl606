import sys
from sklearn.externals import joblib

#load model, normalizer and predict space of parkingID at timestamp
def predict(parkingID, timestamp):
    filename = "parking" + str(parkingID) + "_model.joblib"
    estimator = joblib.load(filename)
    scalerFile = "parking" + str(parkingID) + "_scaler.joblib"
    scaler = joblib.load(scalerFile)  
   
    y = scaler.transform(timestamp)
    prediction = estimator.predict(y)
    print prediction
    return prediction
	
predict(sys.argv[1], sys.argv[2])