# h5cm
HTML5 Context Middleware (H5CM)

Taking into consideration the necessity of providing cross-platform access to context information we have designed an HTML5 Context Middleware (H5CM) to allow developers to reuse existing sensor and reasoner modules making their code more compact. The implementation considers four basic requirements of modularity, extensibility, reusability and the "develop once deploy on any platform" approach.

Any technology should adapt to the end-users’ perspective and tailor applications to the context (i.e., location, situation, social data) using any smart device and platform. Realization of this smart vision demands mechanisms for ubiquitous and reliable acquisition, analysis and sharing of information to improve the experience of end-users, by anticipating user requirements while the end-user remains undisturbed by the underlying technology.

On a complementary dimension application developers should be supported by a transparent infrastructure and context modules that support and expedite cross-platform context-aware application development. For instance, context-acquisition from device components (e.g., device motion, battery level), information retrieved from social networks (e.g., Linkedin, Facebook), and network information (e.g., based on Cell ID, or Wi-Fi) must act as enablers of context-awareness, empowering applications to be adapted to end-user preferences and circumstances.

The H5CM was implemented using the HTML5 standard. The core middleware is based on the Context Manager object that manages the context sensor and reasoner plug-ins that were initially developed to provide access to various sources of context information. Developers are enabled via the modular architecture of the middleware to implement additional context sensor and/or reasoner plug-ins in order to extend the plug-ins repository of the middleware.

Note 1: Sample application can be run on localhost. Code changes needed when changing the hostname. 

Note 2: API keys and client ids need to be generated from the developers' websites/consoles of Google Calendar, Facebook and LinkedIn for authentication and use of their APIs in the H5CM plug-ins and sample application.
