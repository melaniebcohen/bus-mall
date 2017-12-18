# BusMall User Stories
------------------
#### User
- As a user, I need to be able to indicate my product preference when presented with three images
- As a user, I need to see the results after 25 selections have been made
- (Nice to have) As a user, I would like to see how many rounds I have left

#### Developer
- As a developer, I need to build a product selection tool in which three randomized images are displayed side-by-side
- As a developer, I need to track and store which image (product) the user selects
- As a developer, I need to make sure that no images are shown twice in a row for a user
- As a developer, I need to ensure that no results are shown to the users until 25 selections have been made

#### Technical Specs
- Select three random photos from image directory and display them side-by-side in the window
- Receive and track clicks on displayed images
- Once a click has been received, generate three _new_ images that have not been displayed immediately before
- After 25 selections, turn off event listeners and display the list of products with votes received
