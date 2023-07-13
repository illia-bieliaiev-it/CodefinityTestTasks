/**
 Task - imagine that Docker does not exist, and as a developer, you need to implement Docker from scratch.
 Describe, at the pseudocode or high-level algorithm level, the implementation of the feature for creating and running a container.
 Also, specify the operating system API required to implement such a feature.
 Do not include handling all possible exceptional situations.

 Pseudofunctions should have names corresponding to existing Unix commands (tar, rm, touch),
 or system call invocations (cgroups cpuset 1),
 or simply describe actions on operating system entities (mount the /olddir directory into /newdir).


 // below is high-level pseudocode implementation of the features for creating and running container


 /* 1) Create an Isolated File System

 Docker containers run in an isolated filesystem, created from a Docker image. Images are essentially layers of filesystems,
 zipped up into a tarball. So, creating an isolated filesystem would mean extracting the required image into a directory. */

function extractTarball(imagePath: string, containerRoot: string): void {
    // Pseudo function for tar command in unix
    tar('xvf', imagePath, '-C', containerRoot);
}

/* 2) Create a New UTS Namespace. This will isolate hostname and domain name


Namespaces: Docker containers use a feature of the Linux kernel called namespaces to provide isolation.
The unshare system call is used to create new namespaces. When a process is running inside a Docker container,
it's already in a set of namespaces that Docker has set up for it.
Attempting to create new namespaces or to move between namespaces from inside a container is typically not allowed,
because it would break the isolation that Docker provides.

UTS (Unix Timesharing System) - is a namespace in Linux-based systems that isolates two specific system properties related to networking:
hostname and NIS (Network Information Service) domain name.

Hostname - is the network name that identifies your system in a network. It is the name you set during system installation.

NIS domain name - is a property associated with the Network Information Service (NIS), a distributed database system developed by
Sun Microsystems to simplify system administration. NIS allows a computer in a network to share parts of its local configuration
database with other computers.

The UTS namespace allows each container to have its own values for hostname and NIS domain name, thus providing isolation of these
properties from other containers and the host system. */

function unshare(namespace: string): void {
    // Pseudo function to invoke the unshare system call
    unshareNamespace(namespace);
}


// 3) Create a New PID Namespace. This will isolate the process IDs.

/* The PID (Process ID) namespace isolates process identifiers, so processes in different PID namespaces
can have the same PID. This is useful, for example, in containers where you want the init process (typically identified by PID 1)
to be isolated from the main system. The process in a container may think that it has PID 1, while in the actual system its PID will
be something else. This provides additional isolation and security because processes in the container cannot affect processes in the
host system, and vice versa.*/

function clone(flag: string): void {
    // Pseudo function to invoke the clone system call
    cloneNewNamespace(flag);
}

/* 4) Create a New Network Namespace. This will provide the container its own private network stack.

The Network namespace isolates specific aspects of the networking system, such as network interfaces, routing tables, firewalls,
and similar components. This means that processes in different network namespaces can have their own independent network configurations.
This is useful, for example, if you want to create a container with its own internal network stack that is isolated from the host system. */

function setNs(fd: string, nstype: string): void {
    // Pseudo function to invoke the setns system call
    setNetworkNamespace(fd, nstype);
}

/* 5) Create cgroups.
Control groups, or cgroups, are a kernel mechanism in Linux that limits and allocates system resources such as CPU, memory, disk I/O,
and others among groups of processes. Cgroups are used, for example, to enforce resource usage limits that can be consumed by individual containers. */

function cgroupsCpuset(cpu: number, mem: number): void {
    // Pseudo function for cgroup creation
    createCgroup('cpuset', cpu);
    createCgroup('memory', mem);
}

/* 6) Create a New Mount Namespace. This will provide the container its own set of filesystem mount points.

Mount namespace in Linux controls the visibility of mount points in the system. Each mount namespace has its own set of mount
points (or file systems), and processes in different namespaces can see different sets of mount points.
This is particularly useful in containers, where you may want to "isolate" the container's directory tree from the rest of the system.
You can create a new mount namespace for the container, mount the necessary files and directories within that namespace, and processes
inside the container will "think" they have their own isolated file system.
This is one of the key aspects of creating "isolation" in containers - processes inside the container cannot "see" the host file
system or other containers' file systems, they can only see their own "virtual" file system. */

function mount(src: string, target: string, filesystemtype: string, mountflags: number, data: string): void {
    // Pseudo function to invoke the mount system call
    mountNewNamespace(src, target, filesystemtype, mountflags, data);
}

/* 7) Change Root. Change the root directory to give the process an isolated filesystem.

Command "chroot" is used for process isolation by limiting its visibility of the file system to
a specified directory, which becomes the new "root" (/).It is often used to provide additional security and isolation,
as well as to create a "lightweight" environment for a specific process or for testing purposes.
In the context of a container, chroot is used to make the container's file system the root for the
command we run inside the container. This means that when the command runs inside the container, it "sees" only the container's file system,
not the host file system.This is important for container isolation because it prevents the process inside the container
from accessing the host file system, and it allows us to install container-specific programs, libraries, and dependencies
without worrying about impacting the host system. */


function chroot(root: string): void {
    // Pseudo function to invoke the chroot system call
    changeRoot(root);
}

/* Control groups, or cgroups, are a kernel mechanism in Linux that limits and allocates system resources such as CPU, memory, disk I/O,
and others among groups of processes. Cgroups are used, for example, to enforce resource usage limits that can be consumed by individual containers. */

function cgroupsCpuset(cpu: number, mem: number): void {
    // Pseudo function for cgroup creation
    createCgroup('cpuset', cpu);
    createCgroup('memory', mem);
}

/* 6) Create a New Mount Namespace. This will provide the container its own set of filesystem mount points.

Mount namespace in Linux controls the visibility of mount points in the system. Each mount namespace has its own set of mount
points (or file systems), and processes in different namespaces can see different sets of mount points.
This is particularly useful in containers, where you may want to "isolate" the container's directory tree from the rest of the system.
You can create a new mount namespace for the container, mount the necessary files and directories within that namespace, and processes
inside the container will "think" they have their own isolated file system.
This is one of the key aspects of creating "isolation" in containers - processes inside the container cannot "see" the host file
system or other containers' file systems, they can only see their own "virtual" file system. */

function mount(src: string, target: string, filesystemtype: string, mountflags: number, data: string): void {
    // Pseudo function to invoke the mount system call
    mountNewNamespace(src, target, filesystemtype, mountflags, data);
}

/* 7) Change Root. Change the root directory to give the process an isolated filesystem.

Command "chroot" is used for process isolation by limiting its visibility of the file system to
a specified directory, which becomes the new "root" (/).It is often used to provide additional security and isolation,
as well as to create a "lightweight" environment for a specific process or for testing purposes.
In the context of a container, chroot is used to make the container's file system the root for the
command we run inside the container. This means that when the command runs inside the container, it "sees" only the container's file system,
not the host file system.This is important for container isolation because it prevents the process inside the container
from accessing the host file system, and it allows us to install container-specific programs, libraries, and dependencies
without worrying about impacting the host system. */


function chroot(root: string): void {
    // Pseudo function to invoke the chroot system call
    changeRoot(root);
}

// Run the Command. The final step is to actually run the specified command inside our new environment.

function runCommand(command: string): void {
    // Pseudo function to run a command
    runCmd(command);
}

// 9) Putting it all together. The final version of the program would look something like this.

// Isolate the filesystem
extractTarball('/path/to/image.tar', '/path/to/container');

// Create new namespaces
unshare('CLONE_NEWUTS');
clone('CLONE_NEWPID');
setNs('/proc/self/ns/net', 'CLONE_NEWNET');
mount('none', '/proc', 'proc', 0, '');

// Create cgroups
cgroupsCpuset(1, 1024);  // limit to one CPU and 1GB of RAM

// Isolate the filesystem mount points
mount('none', '/path/to/container', '', MS_BIND | MS_REC, '');
chroot('/path/to/container');
mount('none', '/', 'tmpfs', MS_REC | MS_PRIVATE, '');
mount('none', '/proc', 'proc', 0, '');

// Run the command
runCommand('printenv');

/*Run the Command.The final step is to actually run the specified command inside our new environment.*/

function runCommand(command: string): void {
    // Pseudo function to run a command
    runCmd(command);
}

// 9) Putting it all together. The final version of the program would look something like this.

// Isolate the filesystem
extractTarball('/path/to/image.tar', '/path/to/container');

// Create new namespaces
unshare('CLONE_NEWUTS');
clone('CLONE_NEWPID');
setNs('/proc/self/ns/net', 'CLONE_NEWNET');
mount('none', '/proc', 'proc', 0, '');

// Create cgroups
cgroupsCpuset(1, 1024);  // limit to one CPU and 1GB of RAM

// Isolate the filesystem mount points
mount('none', '/path/to/container', '', MS_BIND | MS_REC, '');
chroot('/path/to/container');
mount('none', '/', 'tmpfs', MS_REC | MS_PRIVATE, '');
mount('none', '/proc', 'proc', 0, '');

// Run the command
runCommand('printenv');