import kill from 'tree-kill';
export default () => new Promise((resolve) => {
  if (!global.__e2e.childProcessPid) {
    resolve();
    return;
  }

  kill(global.__e2e.childProcessPid, 'SIGKILL', resolve);
  global.__e2e.childProcessPid = null;
});
