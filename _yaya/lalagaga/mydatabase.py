import sqlite3

#conc=sqlite3.connect('myDatabase.db')
#c=conc.cursor()
# c.execute('''CREATE TABLE COMMITLA
#        (ID INT PRIMARY KEY     NOT NULL,
#        TITLE           TEXT    NOT NULL,
#        CONTEXT         TEXT    NOT NULL);''')
#c.execute("INSERT INTO COMMITLA (ID,TITLE,CONTEXT) VALUES(2,'2/24,lalagaga!','数据库的第一条！')")
#conc.commit()
#conc.close()
conc=sqlite3.connect('type.db')
c=conc.cursor()
c.execute('''CREATE TABLE TYPE
          (ID INT PRIMARY KEY NOT NULL,
           TYPE           TEXT NOT NULL,
           PRITYPE        TEXT  NOT NULL);''')
conc.commit()
conc.close()