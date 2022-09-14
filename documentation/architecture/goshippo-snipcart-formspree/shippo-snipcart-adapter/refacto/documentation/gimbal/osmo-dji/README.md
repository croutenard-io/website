

To start developing with the DJI Mobile SDK: 
* A quickstart setting up a first project : 
  * https://developer.dji.com/document/f7161768-60d9-4bfa-8f50-e46cdfbdc3ed :  first, we need to be able to do firmware upgrade. use [**DJI Assistant 2**](https://www.dji.com/fr/downloads/softwares/assistant-dji-2) to upgrade the firmware of the drone and hardware platform, for details please refer to [this reference](https://developer.dji.com/document/39d07b3b-3ee8-496e-944c-c269f18c374b)
  * I checked that  [**DJI Assistant 2**](https://www.dji.com/fr/downloads/softwares/assistant-dji-2) is compatible with DJI 's "Osmo Mobile" product class
  * I also found https://www.dji.com/fr/downloads/products/osmo-mobile-3 
* The Gimbal Management part of the Docuementation :
  * start point : https://developer.dji.com/document/7bf13f92-35cf-4ac2-8fb6-079e849f34b4
  * 
* about how  to use their SDK called _**"OSDK"**_ :  
  * they have a github org, nto that clean : https://github.com/dji-sdk
  * when searching the Github Org, with the term "Gimbal", I find occurences in only one repository, called "the payload SDK". So it seems its the payload SDK, that's got to be used to develop software for the Gimbal management... (note its `C` Language): https://github.com/search?q=org%3Adji-sdk+gimbals
  * On [this page](https://github.com/search?q=org%3Adji-sdk+gimbal) I find Gimbal Management SDK Documentation. the source code examples seem to be Java. Among Java Classes, in example we find the `GimbalManagerSyncSample` Class, and [this github search](https://github.com/search?q=org%3Adji-sdk+GimbalManagerSyncSample&type=code) shows that this Java Class is part of what they call the _**"Onbaord SDK"**_

  * https://github.com/dji-sdk/Payload-SDK/search?q=gimbal



First feeling is that developing anything in the field will not be easy...
