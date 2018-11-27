import sys
from sklearn.externals import joblib
from datetime import datetime
#load model, normalizer and predict space of parkingID at timestamp
def predict(parkingID, timestamp):
    ts = int(timestamp)
    h = datetime.utcfromtimestamp(ts).strftime('%H')
    m = datetime.utcfromtimestamp(ts).strftime('%M')
    timestamp = str(int(h)*60+int(m))
    filename = "parking" + str(parkingID) + "_model.joblib"
    estimator = joblib.load(filename)
    # scalerFile = "parking" + str(parkingID) + "_scaler.joblib"
    # scaler = joblib.load(scalerFile)  

    # y = scaler.transform(timestamp)
    prediction = estimator.predict(timestamp)
    print prediction
    # return prediction
	
predict(sys.argv[1], sys.argv[2])