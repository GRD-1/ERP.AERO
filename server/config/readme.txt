
git tracking has been disabled for this files:
• /server/config/credentials.js
• /server/config/readme.txt

It was done not by the gitignore file, but with the help of a special git command [git update-index --assume-unchanged <filepath/filename>].
Otherwise, git will delete such files while downloading the updates load from repository.
So, the current files will not be updated from git, but if we change it, git will not allow to update the project using the [pull] command.
it will warn us, that there are unsaved files. In order to avoid it:
• before changes we need to enable change tracking using the command: [git update-index --no-assume-unchanged <filepath/filename>]
• change the file
• and disable the tracking again: git update-index --assume-unchanged <filepath/filename>


