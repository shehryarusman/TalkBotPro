import json
import yaml
from datetime import datetime

LOCATION = "database.yaml"

class yamlDB:
    def __init__(self):
        pass

    def inject(self, data):
        content = data['content']
        currentDB = self.getAll()
        num = len(currentDB)

        #DATE STUFF AAHHHHHHHHHHHH
        current_date = datetime.now()
        day_of_week_string = current_date.strftime("%A")
        month_string = current_date.strftime("%B")
        year = current_date.year
        month = current_date.month
        date_str = f'{day_of_week_string}, {month_string} {month}, {year}'

        with open(LOCATION, 'w') as file:
            while(f"Content{num}" in currentDB):
                num+= 1
            data = {
                f"Content{num}": [num, content, date_str]
            }
            currentDB.update(data)
            json_string = json.dumps(currentDB)
            yaml.dump(json_string, file)
        
        self.getAllContent()

    def getAll(self):
        with open(LOCATION, 'r') as file:
            data = yaml.safe_load(file)
        print(data)
        if not data:
            return {}
        return json.loads(data)
    
    def getAllContent(self):
        contents = [value for _,value in self.getAll().items()]
        contents.sort(key=lambda x: x[0])
        return [x[1] for x in contents]