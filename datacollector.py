import time
import mysql.connector

# def executeSomething():
    # #code here
	# print "tick"
	# time.sleep(300)

# while True:
    # executeSomething()
	
	
mydb = mysql.connector.connect(
	host="localhost",
	user="ubuntu",
	passwd="epl606",
	database="parking"
)

mycursor = mydb.cursor()

sql = "INSERT INTO data (parking_id, space, timestamp) VALUES (%s, %s, %s)"
val = ("1", "12", "12345")
mycursor.execute(sql, val)

mydb.commit()
