const { exec } = require('child_process');
const readline = require('readline');

// Function to execute git commands and npm run deploy
const executeGitCommands = () => {
  // Git status
  exec('git status', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing git status: ${err}`);
      return;
    }
    console.log(stdout);

    // Git add .
    exec('git add .', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing git add .: ${err}`);
        return;
      }
      console.log('Files staged for commit.');

      // Git status
      exec('git status', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error executing git status: ${err}`);
          return;
        }
        console.log(stdout);

        // Ask for commit message
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl.question('Enter the commit message: ', message => {
          // Git commit -m
          exec(`git commit -m "${message}"`, (err, stdout, stderr) => {
            if (err) {
              console.error(`Error executing git commit: ${err}`);
              return;
            }
            console.log('Changes committed with message:', message);
            rl.close();

            // Git push
            exec('git push', (err, stdout, stderr) => {
              if (err) {
                console.error(`Error executing git push: ${err}`);
                return;
              }
              console.log('Changes pushed to the remote repository.');

              // npm run deploy
              exec('npm run deploy', (err, stdout, stderr) => {
                if (err) {
                  console.error(`Error executing npm run deploy: ${err}`);
                  return;
                }
                console.log('Deployment completed.');
              });
            });
          });
        });
      });
    });
  });
};

// Run the function to execute git commands and npm run deploy
executeGitCommands();
