from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
import joblib
from flask_cors import CORS
import os

logregmodel = joblib.load("logregmodel.pkl")
lrfsmodel = joblib.load("lrfs.pkl")
lrscaler = joblib.load("lrscaler.pkl")
standardscaler = joblib.load("standardScaler.pkl")
labelencoder = joblib.load("labelencoder.pkl")
Onehotencoder = joblib.load("oneHotEncoder.pkl")

threshold = 0.6

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/static/<path:filename>")
def serve_static(filename):
    root_dir = os.path.dirname(os.getcwd())
    return send_file(os.path.join(root_dir, "build", "static", filename))


@app.route("/pred", methods=["POST"])
def predict():
    gender = request.form.get("gender")
    ssc_p = request.form.get("ssc_p")
    ssc_b = request.form.get("ssc_b")
    hsc_p = request.form.get("hsc_p")
    hsc_b = request.form.get("hsc_b")
    hsc_s = request.form.get("hsc_s")
    degree_p = request.form.get("degree_p")
    degree_t = request.form.get("degree_t")
    workex = request.form.get("workex")
    etest_p = request.form.get("etest_p")
    specialisation = request.form.get("specialisation")
    mba_p = request.form.get("mba_p")
    data = pd.DataFrame(
        {
            "gender": [gender],
            "ss_p": [ssc_p],
            "ssc_b": [ssc_b],
            "hsc_p": [hsc_p],
            "hsc_b": [hsc_b],
            "hsc_s": [hsc_s],
            "degree_p": [degree_p],
            "degree_t": [degree_t],
            "workex": [workex],
            "etest_p": [etest_p],
            "specialisation": [specialisation],
            "mba_p": [mba_p],
        }
    )
    categorical_col = [
        "ssc_b",
        "hsc_b",
        "hsc_s",
        "degree_t",
        "workex",
        "specialisation",
    ]
    encoded = pd.DataFrame(Onehotencoder.transform(data[categorical_col]))
    other_cols = [col for col in data.columns if col not in categorical_col]
    data = pd.concat([encoded, data[other_cols]], axis=1)
    lrdata = data.copy()
    data = standardscaler.transform(data)

    predicted_probabilities = logregmodel.predict_proba(data)
    predicted_classes = (predicted_probabilities[:, 1] >= threshold).astype(int)

    lrdata = lrscaler.transform(lrdata)
    predictedsal = lrfsmodel.predict(lrdata)

    retobj = {
        "probablities": predicted_probabilities.tolist()[0],
        "predclass": predicted_classes.tolist()[0],
        "sal": predictedsal[0][0],
    }
    return jsonify(retobj)


if __name__ == "__main__":
    print("server started")
    app.run()
