import sys
from sklearn.externals import joblib

def predict(parkingID, timestamp):
    filename = parkingID + ".joblib"
    estimator = joblib.load(filename)
    prediction = estimator.predict(timestamp)
    print prediction
    return prediction
	
predict(sys.argv[1], float(sys.argv[2]))