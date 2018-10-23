# Import modules
from xml.dom import minidom
import urllib2
url = 'http://www.nicosia.org.cy/el-GR/rss/parkingspaces/' # define XML location
dom = minidom.parse(urllib2.urlopen(url)) # parse the data
spaces = dom.getElementsByTagName('spaces')
ids = dom.getElementsByTagName('id')


for x in range(4):
	if ids[x].firstChild.nodeValue != "3" :
		print spaces[x].firstChild.nodeValue
		print ids[x].firstChild.nodeValue
