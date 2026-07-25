from app.services.parser import read_excel
from fastapi import APIRouter, UploadFile, File
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Read Excel
    transactions = read_excel(file_path)

    return {
        "filename": file.filename,
        "rows": len(transactions),
        "transactions": transactions
    }