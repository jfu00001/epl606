import mysql.connector

def getData():
	mydb = mysql.connector.connect(
		host="localhost",
		user="ubuntu",
		passwd="epl606",
		database="parking"
	)
	
	cursor = mydb.cursor()
	query = "SELECT * FROM data WHERE 'parking_id' = 1"
	cursor.execute(query)
	data = cursor.fetchall()
	
	print data[0]
	
	cursor.close ()
	mydb.close ()
	
getData()