# Testing leon.ai

All the following tests of leon.ai have been made using : 
* leon s



Install nodejs 18+, python3, `pipeenv`



```bash
$ pip install --user pipenv
Collecting pipenv
  Downloading pipenv-2022.7.24-py2.py3-none-any.whl (3.7 MB)
     ---------------------------------------- 3.7/3.7 MB 1.2 MB/s eta 0:00:00
Collecting virtualenv-clone>=0.2.5
  Downloading virtualenv_clone-0.5.7-py3-none-any.whl (6.6 kB)
Requirement already satisfied: setuptools>=36.2.1 in c:\python310\lib\site-packages (from pipenv) (58.1.0)
Collecting virtualenv
  Downloading virtualenv-20.15.1-py2.py3-none-any.whl (10.1 MB)
     ---------------------------------------- 10.1/10.1 MB 1.1 MB/s eta 0:00:00
Requirement already satisfied: pip>=22.0.4 in c:\python310\lib\site-packages (from pipenv) (22.0.4)
Collecting certifi
  Downloading certifi-2022.6.15-py3-none-any.whl (160 kB)
     -------------------------------------- 160.2/160.2 KB 1.6 MB/s eta 0:00:00
Collecting filelock<4,>=3.2
  Downloading filelock-3.7.1-py3-none-any.whl (10 kB)
Collecting distlib<1,>=0.3.1
  Downloading distlib-0.3.5-py2.py3-none-any.whl (466 kB)
     -------------------------------------- 467.0/467.0 KB 1.0 MB/s eta 0:00:00
Collecting six<2,>=1.9.0
  Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Collecting platformdirs<3,>=2
  Downloading platformdirs-2.5.2-py3-none-any.whl (14 kB)
Installing collected packages: distlib, virtualenv-clone, six, platformdirs, filelock, certifi, virtualenv, pipenv
  WARNING: The script virtualenv-clone.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The script virtualenv.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The scripts pipenv-resolver.exe and pipenv.exe are installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed certifi-2022.6.15 distlib-0.3.5 filelock-3.7.1 pipenv-2022.7.24 platformdirs-2.5.2 six-1.16.0 virtualenv-20.15.1 virtualenv-clone-0.5.7
WARNING: You are using pip version 22.0.4; however, version 22.2 is available.
You should consider upgrading via the 'C:\Python310\python.exe -m pip install --upgrade pip' command.


```



```bash
  WARNING: The script virtualenv-clone.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The script virtualenv.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  WARNING: The scripts pipenv-resolver.exe and pipenv.exe are installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
```

* ccccc : 


```bash

#  WARNING: The script virtualenv-clone.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts'

#  WARNING: The script virtualenv.exe is installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts'

#  WARNING: The scripts pipenv-resolver.exe and pipenv.exe are installed in 'C:\Users\Utilisateur\AppData\Roaming\Python\Python310\Scripts' 


cat <<EOF>./profile.addon

# ---
# PIPE_ENV Python utility 
# ---
export PIPE_ENV_HOME='/c/Users/Utilisateur/AppData/Roaming/Python/Python310/Scripts' 
export PATH="\$PATH:\${PIPE_ENV_HOME}"
EOF


ls -alh  ~/.profile && cat ./profile.addon | tee -a ~/.profile
ls -alh  ~/.bash_profile && cat ./profile.addon | tee -a ~/.bash_profile
ls -alh  ~/.bashrc && cat ./profile.addon | tee -a ~/.bashrc

```


* a great android keyboard to be able tosend `alt + c` for example : https://play.google.com/store/apps/details?id=org.pocketworkstation.pckeyboard


## How to train the model 


* First try, that i onloy found into the docs about the npm commands : 

```bash
$ npm run train expressions fr


> leon@1.0.0-beta.6 train
> babel-node scripts/run-train.js "expressions" "fr"

Browserslist: caniuse-lite is outdated. Please run:
  npx browserslist@latest --update-db
  Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating
➡ Training "Calendar" package modules expressions...
✖ ENOENT: no such file or directory, open 'packages/calendar/data/expressions/expressions.json'
✖ Failed to train: Error: ENOENT: no such file or directory, open 'packages/calendar/data/expressions/expressions.json'

```


Ok, one thing is new : It's the first time in my life that i find a project where you have a command to run the ML training...


Right, so let's see : 


```bash
npm run train fr
npm run train en

```

note that the code to train a model seems pretty simple: 
* It maybe its scalability which might be a bit more complex to design.
* The `scripts/train.js` file contains all the source code to train the model


## How to train model with new klnowledge

Ok, now if i run `npm run train fr && npm run train en`, then we train the model.

Fine.

Now, how can we train leon to understand and answer more than he u_nderstands and answers after running `npm run train fr && npm run train en`, without changing anything.



### Reverse engineering

#### First, facts

* `npm run train ${LANGUAGE_CODE}` runs the `scripts/train.js` `nodejs` script
* `npm run train ${LANGUAGE_CODE}` uses JSON files during its execution. For example : 
  * running `npm run train ${LANGUAGE_CODE}` uses the ` ${LANGUAGE_CODE}`
  * running `npm run train ${LANGUAGE_CODE}` uses the `server/src/data/leon-model.nlp` file, which is very mcuh bigger than other files like JSON file
  * running `npm run train ${LANGUAGE_CODE}` uses the `server/src/data/en.json` file
  * running `npm run train ${LANGUAGE_CODE}` uses the `server/src/data/fr.json` file




Ok all the good part about getting everything offline, and downloading the full real model behind, is documented at https://docs.getleon.ai/offline

Btw I like very much the npm scripts that are here to setup entire project to be offline