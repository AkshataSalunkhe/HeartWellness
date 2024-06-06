import sys
import pandas as pd
from src.exception import CustomException
from src.utils import load_object

class PredictPipeline:
    def __init__(self):
        pass

class CustomData:
    def __init__(self,
                    Age: int,
                    Sex: str,
                    ChestPainType: str,
                    RestingBP: int,
                    Cholesterol: int,
                    FastingBS: int,
                    RestingECG : str,
                    MaxHR: int,
                    ExerciseAngina:str,
                    Oldpeak,
                    ST_Slope:str)
        