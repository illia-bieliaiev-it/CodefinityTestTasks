# Test tasks for Node.js Engineer in [Codefinity](https://codefinity.com/) company
 
## The first task description:

1.Solve the "FizzBuzz" problem in Golang or Node.js. 
❗️Make your code as extensible and flexible as possible.❗️
Emphasis on the last sentence. The answer can be a .go file.

## The second task description:

/** 
Task - imagine that Docker does not exist, and as a developer, you need to implement Docker from scratch.
Describe, at the pseudocode or high-level algorithm level, the implementation of the feature for creating and running a container.
Also, specify the operating system API required to implement such a feature.
Do not include handling all possible exceptional situations.

Pseudofunctions should have names corresponding to existing Unix commands (tar, rm, touch),
or system call invocations (cgroups cpuset 1),
or simply describe actions on operating system entities (mount the /olddir directory into /newdir).

Below is an example response, but for a different task - creating an archive with 10 files, each containing random characters:
*/

```typescript
const createFileWithContent = (filename:string, content:string) => {
// echo $content > $fileName
};
const rmFile = (filename:string) => {
// rm $fileName
};

const createRandomStr = () => {
return 'random';
};

const createEmptyArchive = (path:string) => {
// tar -cf tarfilename.tar -T /dev/null
return;
};
const addFileToArchive = (path:string, pathToArchive:string) => {
// tar --append --file=archive.tar targetFile
return;
};

const main = () => {
const archivePath = 'archivePath';
createEmptyArchive(archivePath);
Array.from(Array(10).keys())
.map((e) => (e + 1).toString())
.map((filename) => {
createFileWithContent(filename, createRandomStr());
addFileToArchive(filename, archivePath);
rmFile(filename);
});
};

main();
```

(Deadline for tasks is absent)
