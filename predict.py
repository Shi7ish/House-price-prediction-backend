import sys, json, joblib, warnings, xgboost

warnings.filterwarnings("ignore")

model = joblib.load("model.pkl")
data = json.loads(sys.argv[1])

pred = model.predict([data])
print(float(pred[0]))