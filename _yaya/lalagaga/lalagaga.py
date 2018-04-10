from flask import Flask
from flask import render_template
from flask import request
import sqlite3
import json

app = Flask(__name__)
conc=sqlite3.connect('myDatabase.db')
c=conc.cursor()
concType=sqlite3.connect('type.db')
cType=concType.cursor()

def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/addCommit',methods=['POST'])
def addcommit():
    data = request.data
    j_data = json.loads(data)
    c.execute('''INSERT INTO COMMITLA
               (ID,TITLE,CONTEXT,TYPE) 
               VALUES(%d, '%s', '%s','%s')'''%(j_data['id'],j_data['title'],j_data['context'],j_data['type'])
              )
    conc.commit()
    response={'msg':'committed'}
    return json.dumps(response)

@app.route('/setCommit',methods=['POST'])
def setcommit():
    data = request.data
    j_data = json.loads(data)
    c.execute('''UPDATE COMMITLA 
               SET TITLE = '%s', CONTEXT = '%s' , TYPE = '%s'
               WHERE ID =%d'''%(j_data['title'],j_data['context'],j_data['type'],j_data['id']))
    conc.commit()
    return json.dumps(j_data)
@app.route('/getNode',methods=['POST'])
def getnode():
    type=request.data
    j_type=json.loads(type)
    command="SELECT ID,TYPE,PRITYPE,LEVAL from TYPE WHERE PRITYPE = '%s'"%j_type['type']
    data=cType.execute(command)
    listdata=[]
    for row in data:
        dic={}
        dic['id']=row[0]
        dic['TYPE']=row[1]
        dic['PRITYPE']=row[2]
        dic['LEVAL']=row[3]
        listdata.append(dic)
    print(json.dumps(listdata))
    return json.dumps(listdata)

@app.route('/getByType',methods=['POST'])
def getbytype():
    type = request.data
    j_type = json.loads(type)
    command = "SELECT ID,TYPE,PRITYPE,LEVAL from TYPE WHERE TYPE = '%s'" % j_type['type']
    data = cType.execute(command)
    listdata = []
    for row in data:
        dic = {}
        dic['id'] = row[0]
        dic['type'] = row[1]
        dic['pritype'] = row[2]
        dic['leval'] = row[3]
        listdata.append(dic)
    print(json.dumps(listdata))
    return json.dumps(listdata)

@app.route('/getCommit',methods=['POST'])
def getcommit():
    type=request.data
    j_type=json.loads(type)
    if j_type['type']=='':
        command="SELECT ID ,TITLE,CONTEXT,TYPE from COMMITLA"
    else:
        command="SELECT ID ,TITLE,CONTEXT,TYPE from COMMITLA WHERE TYPE ='%s'"%j_type['type']
    data=c.execute(command)
    listdata=[]
    for row in data:
        dic = {}
        dic['id']=row[0]
        dic['title']=row[1]
        dic['context']=row[2]
        dic['type'] = row[3]
        listdata.append(dic)
    return json.dumps(listdata)

@app.route('/getType',methods=['POST'])
def gettype():
    command = "SELECT TYPE from TYPE WHERE LEVAL = 2"
    data = cType.execute(command)
    listdata = []
    for row in data:
        dic = {}
        dic['type'] = row[0]
        listdata.append(dic)
    return json.dumps(listdata)

@app.route('/getCommitByID',methods=['POST'])
def getcommitbyid():
    id=request.data
    j_id=json.loads(id)
    command="SELECT ID ,TITLE,CONTEXT,TYPE from COMMITLA WHERE ID =%d"%j_id['id']
    data=c.execute(command)
    listdata = []
    for row in data:
        dic = {}
        dic['id'] = row[0]
        dic['title'] = row[1]
        dic['context'] = row[2]
        dic['type'] = row[3]
        listdata.append(dic)
    return json.dumps(listdata)

@app.route('/addType',methods=['POST'])
def addtype():
    type=request.data
    j_type=json.loads(type)
    cType.execute('''INSERT INTO TYPE (TYPE,PRITYPE,LEVAL) 
                  VALUES('%s', '%s','%s')''' % (j_type['type'], j_type['pritype'], int(j_type['leval']))
              )
    concType.commit()
    response = {'msg': 'committed'}
    return json.dumps(response)

@app.route('/setType',methods=['POST'])
def settype():
    type=request.data
    j_type=json.loads(type)
    cType.execute('''UPDATE TYPE 
                  SET TYPE = '%s', PRITYPE = '%s' ,LEVAL ='%s' WHERE TYPE ='%s'
                  ''' % (j_type['type'], j_type['pritype'],j_type['leval'] ,j_type['thetype']))
    concType.commit()
    return json.dumps(j_type)

@app.route('/deleteNode',methods=['POST'])
def deletenode():
    data = request.data
    j_data = json.loads(data)
    command = "DELETE from TYPE where TYPE='%s'"%j_data['type']
    cType.execute(command)
    concType.commit()
    response = {'msg': 'deleted'}
    return json.dumps(response)

@app.route('/deleteCommit',methods=['POST'])
def deletecommit():
    data=request.data
    j_data = json.loads(data)
    keysla=j_data['theKey'].split(',')
    command="DELETE from COMMITLA where ID="
    for item in keysla:
        if item==keysla[-1]:
            command = command + item
        else:
            command=command+item+" or ID="
    print(command)
    c.execute(command)
    conc.commit()
    response={'msg':'deleted'}
    return json.dumps(response)

if __name__ == '__main__':
    app.after_request(after_request);
    app.run()

















