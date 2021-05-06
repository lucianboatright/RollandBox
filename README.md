
# Watch Box Web App 


## Project outline
This website is mainly aimed at helping the user with two things.
1. Allowing the user to easily store images and information about their watches in order to have a simple and easy to view their watch collection or allowing other so view
2. Allows users to view and comment on other people collections by watch or total collection. 

This will allow sellers to easily show their entire collection in one place.


## Technologies
This was built on a React cra front end with Tailwind css used for styling and firebase used for the data storage.

- Tailwind Css - used to style the components, create the grids and space them out. 
- React-Loading-Skeleton - place holder visual white data is loading, holds space ready for images to load into.
- Eslint - used for managing code base and checking for best code practice.
- Prop Types - used to pass information from the database down through the react components.


Folder structre
- constants - Dom for directing between pages
- compoents - react components used to build up pages.
- context - conecting to firebase
- helpers - checking user status or logged in status
- lib - firebase info.
- services (firebase functions in here)
- styles (tailwind foilder app/tailwinds)
- hooks
- pages - fundimental pages for the router dom to manage and show components.
- images - currently storing watch images and items before storing in firebase


## Interesting aplications to create box
One of the main parts of this appp is the visulisation of the box surrounding the watches. At first I used a single background image and arraged the watches to fit into each space but they were seperate 

![watchbox](/images/readme/first_background.png)
![watchbox2](/images/readme/first_background_2.png)

This had its limitations though it me be something that the user can chose between.
- This style will have empty spaces even if the watch is not there. 
- Works well when there is not information.

The second style uses a single a single box .png as shown below which is used as a background image that is repeated around each image which means the box will only be visiable around existant watches. This means the box is infinate and will grow with the collection. It does also mean that there will be spaces that are not showing the box leading to a non complete box visual as shown below.

![watchoutline](/images/readme/single_box.png)
![watchoutline](/images/readme/profile_box.png)
![watchoutline](/images/readme/timeline_box.png)