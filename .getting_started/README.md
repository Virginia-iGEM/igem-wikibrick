# 1 What is this document

This is a quick primer, primarily aimed at individuals who have little to no experience with programming on how to use Git and Github. It’s also for programmers who have never used it before, have tried and failed to use it before, or haven’t used it in ages and need a refresher.

For those who have used version control before, or are using it now, or are very confident in their understanding of programming concepts, please look at the official Getting Started guide published by the developers of Git. Additionally, if you have questions or are interested in the more advanced features of Git, feel free to reference this document as it’s quite comprehensive.

If you have any questions, feel free to shoot me a private message in GroupMe or email Dylan Culfogienis at dtc9bb@virginia.edu. Or just, y’know, talk to me, I don’t bite.



# 2 Table of Contents



# 3 What is Github

Github is a source code repository hosting and sharing website that makes use of the Git Version Control System (Git VCS). In layman's terms, it’s kinda like Google Drive, but specifically meant for open-source, code-centric software projects that many people will be working on at once. Some projects that are hosted on Github include Linux, the Python programming language, and a majority of the code that makes websites like Facebook, Twitter, Google and Youtube run.

If you don’t care about how Git/Github works and just want to get work done, just read Section 4, Okay cool, how do I use it. If you’re miffed that you have to learn how to use another damn program and/or are curious about how Git works and why we’re using it, you should probably read Section 5 first, Why don’t we just use Google Drive.

# 4 Okay cool, how do I use it

Okay cool, how do I use it

If you have any trouble with any of these steps, please do not slam your face against your desk and try to fix things for hours. Talk to me. Setup should only take 5 minutes. Committing and pushing changes should take about 20 seconds. If it’s taking longer than this, I’ll sit down with you and work you through it, or answer any questions you have.

## 4.1 Getting set up
Step 1, for most people, download Git from the official website: https://git-scm.com/downloads.

Step 2, launch Git GUI through your start menu. Alternatively, you can right click on empty space on your desktop and click Git GUI Here. This should open a window that looks like this:


# 5 Why don't we just use Google Drive
Note, you can skip this section if you believe me and trust that Git is awesome and have accepted the fact that we’re using Github. This section is for everyone that’s thinking “Why do I have to learn another piece of software for this synthetic biology project.”

There are a lot of answers to this question, but the most important ones are merging, revision control, branches, blame and consistency. Some of these are buzzwords used by the open source/version control community, so let me define them.

Merging is best explained by an example. Let’s say we have two members working on the same project at the same time. One team members changes a hundred or so lines of code towards the top of the file in some class definitions, another changes the main method at the bottom of the file. Concurrently, two other team members are working on some HTML that makes use of these files.

Before all team members started, the project was the same; now it is different. If we were using Google Drive or something else like it, all 4 team members would upload their changes, and whoever was the last to upload their changes would be the one who “wins.” Some work would be overwritten; it would not be lost, as Google Drive retains a history of all files uploaded, however, it wouldn’t be obvious that not everyone’s changes were applied, and someone would have to go in their and manually cut and paste in the changes made.

Git does this all automatically. Team members commit their changes to their local repository, and then upload (push) those changes to our Github repository. Git tells you if there were any problems, and walks you through how to resolve them. 90% of the time however, its algorithms successfully merge all changes concurrently made by authors and saves everybody a lot of time and hassle.

Revision control is the idea that any past changes to the project can be seen. This means that if you want to experiment with some code, completely break something, utterly ruin the functionality of the project, you don’t have to go through the trouble of making a backup and duplicating everything somewhere else on your machine. Because Git tracks the history of the entire project, if you mess something up, you can just press a button and it will restore the previous state of the project. This additionally means that, if you mess something up and don’t realize it until 10 days later, but you’ve made a bunch of changes you want to keep, you can rewind only the part that you messed up, and keep all of the changes that you’ve already made.

In comparison, Google Drive has rough, automatic revision control that isn’t explicit. I’m pretty sure it also deletes revisions past a certain date.

Branches are related to this. Branching is the idea that multiple team members can work on different versions of the project at the same time, upload their changes independently of one another, and then merge them down the line into one, consistent, holistic project. This is a bit of an advanced concept, and it may be hard to see the difference between it and merging. Shoot me a message if you want further clarification, otherwise trust me in saying that it’s extremely valuable.

Blame is the concept of being aware of who made what change and who contributed what work. When it comes to code, Google Drive only tracks whoever uploaded the last change. Because of the way that Git works, it tracks every contribution everyone has ever made to every single line of code in the entire project.

This both allows you to see who has contributed the most (vital for paying people reasonable amounts of money for their work), and who is causing problems in the code. You can see exactly when and where someone broke something. Or when and where someone fixed something.

Lastly, consistency. Because Google Drive allows anyone with access to the drive to make a change, someone may do something that you don’t like without you realizing, breaking something that was important to you. Or you may do something stupid and break something without realizing it.

Reversing these changes is hard. Figuring out why problems are occurring is harder. Git is consistent in that you always have access to a working code base, even if people have made changes, because you can just rewind time, or switch to a branch that you know is working. In Google Drive, everyone is working with the work-in-progress, fresh-out-of-the-oven, gooey, sticky code that everyone's gotten their hands on. There is no isolation, and so things are more likely to break.

