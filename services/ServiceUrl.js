const testBaseUrl =  {
	// url: 'http://localhost'				// Comment this line to switch to ebmacshost api
}

const baseUrl = testBaseUrl.url || 'https://ebmacshost.com'

const extension = '/mqttweb/api/users'
const adminExtension = '/adminpanel/api/users'

module.exports = {
	LOGIN: {
		url: baseUrl + extension +'/app_login',				//POST
		name: extension + "/app_login"
	},         							
	ADMIN_LOGIN: {
		url: baseUrl + adminExtension +'/app_login',				//POST
		name: adminExtension + "/app_login"
	},         							
}
