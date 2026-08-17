import pandas as pd
import numpy as np


def read_excel(file_path):

    # Read Excel without assuming a header row
    temp_df = pd.read_excel(file_path, header=None)

    header_row = None

    # Find the actual transaction header row
    for i in range(min(20, len(temp_df))):

        row = (
            temp_df.iloc[i]
            .astype(str)
            .str.strip()
            .str.upper()
            .tolist()
        )

        if (
            "DESCRIPTION" in row
            and (
                "POST DATE" in row
                or "DATE" in row
                or "TXN DATE" in row
                or "TRANSACTION DATE" in row
            )
        ):
            header_row = i
            break

    if header_row is None:
        raise Exception("Statement header not found.")

    print("Detected header row:", header_row)

    # Read again using detected header
    df = pd.read_excel(file_path, header=header_row)

    print("Original columns:")
    print(df.columns.tolist())

    # Clean column names
    df.columns = (
        df.columns
        .astype(str)
        .str.strip()
    )

    # Common bank column mappings
    column_map = {
        "Post Date": "Date",
        "Txn Date": "Date",
        "Transaction Date": "Date",

        "Description": "Description",
        "Narration": "Description",
        "Remarks": "Description",

        "Debit": "Debit",
        "Withdrawal Amt": "Debit",
        "Debit Amount": "Debit",

        "Credit": "Credit",
        "Deposit Amt": "Credit",
        "Credit Amount": "Credit",

        "Balance": "Balance",
    }

    df.rename(columns=column_map, inplace=True)

    print("Mapped columns:")
    print(df.columns.tolist())

    # Required columns
    required = [
        "Date",
        "Description",
        "Debit",
        "Credit",
        "Balance",
    ]

    # Add missing columns if a bank does not provide them
    for column in required:
        if column not in df.columns:
            df[column] = ""

    # Keep only required columns
    df = df[required]

    # Remove completely empty rows
    df = df.replace(r"^\s*$", np.nan, regex=True)
    df = df.dropna(how="all")

    # Remove BROUGHT FORWARD rows
    df = df[
        ~df["Description"]
        .astype(str)
        .str.upper()
        .str.contains("BROUGHT FORWARD", na=False)
    ]

    # Remove any remaining NaN / Infinity values
    df = df.replace(
        [np.inf, -np.inf],
        np.nan
    )

    df = df.where(pd.notna(df), None)

    print("Final columns:")
    print(df.columns.tolist())

    print("Final rows:")
    print(df.head())

    print("Total transactions:", len(df))

    # Convert dataframe to records
    records = df.to_dict(orient="records")

    # Final safety check:
    # Convert any remaining NaN-like values to None
    clean_records = []

    for record in records:

        clean_record = {}

        for key, value in record.items():

            if pd.isna(value):
                clean_record[key] = None

            elif isinstance(value, (float, np.floating)):
                if not np.isfinite(value):
                    clean_record[key] = None
                else:
                    clean_record[key] = value

            else:
                clean_record[key] = value

        clean_records.append(clean_record)

    return clean_records