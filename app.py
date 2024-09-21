from flask import Flask, jsonify, render_template
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Carregar o CSV no início
data_path = "C:/Users/Mariana/OneDrive/Área de Trabalho/teste/BASE_DE_DADOS_COMUNIDADES_TERAPEUTICAS.csv"
tabela = pd.read_csv(data_path)

# Substituir NaN por None
tabela = tabela.where(pd.notnull(tabela), None)

@app.route('/dados-json')
def dados_json():
    data = tabela.to_dict(orient='records')
    return jsonify(data)

@app.route('/dados-json/<estado>')
def dados_json_estado(estado):
    dados_estado = tabela[tabela['Estado'].str.contains(estado, case=False, na=False)].to_dict(orient='records')
    return jsonify(dados_estado)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
