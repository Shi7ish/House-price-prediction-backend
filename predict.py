import sys, json, joblib, warnings, os
warnings.filterwarnings("ignore")

# load model from same folder as this file
base = os.path.dirname(__file__)
model = joblib.load(os.path.join(base, "model.pkl"))

features = json.loads(sys.argv[1])

prediction = model.predict([features])[0]
print(prediction)
