import pandas as pd


def read_excel(file_path):
    df = pd.read_excel(file_path)

    print(df.head())          
    print(df.dtypes)         

    df = df.fillna("")
    df = df.astype(str)

    return df.to_dict(orient="records")