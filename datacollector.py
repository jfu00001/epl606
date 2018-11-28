import time
import mysql.connector
from xml.dom import minidom
import urllib2
import os

def executeSomething():
	newpid = os.fork()
	if newpid == 0:
		timestamp = int(time.time());
		mydb = mysql.connector.connect(
			host="localhost",
			user="ubuntu",
			passwd="epl606",
			database="parking"
		)
		url = 'http://www.nicosia.org.cy/el-GR/rss/parkingspaces/' # define XML location
		dom = minidom.parse(urllib2.urlopen(url)) # parse the data
		spaces = dom.getElementsByTagName('spaces')
		ids = dom.getElementsByTagName('id')

		for x in range(4):
			if ids[x].firstChild.nodeValue != "3" :
				mycursor = mydb.cursor()
				sql = "INSERT INTO data (parking_id, space, timestamp) VALUES (%s, %s, %s)"
				val = (str(ids[x].firstChild.nodeValue), str(spaces[x].firstChild.nodeValue), str(timestamp))
				mycursor.execute(sql, val)

				mydb.commit()
		os._exit(0);
	time.sleep(300)

while True:
    executeSomething()