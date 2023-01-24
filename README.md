# Getting Started with SnapShrine

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

SnapShrine lets anyone with an Arconnect wallet upload image files to Arweave. As soon as a user connects their wallet, they can see all the photos they've uploaded, on the same page. This front end uses GraphQL and Apollo client to query the official Arweave GraphQL endpoint, https://arweave.net/graphql.

## Available Scripts

Just like any Create React App implementation, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Notes on Dependencies

If you are cloning this repo, make sure to install all necessary dependencies by running the following:

### `npm install`

This app uses react-dropzone to allow users to drag and drop image files directly onto the page. For querying data, it uses Apollo client and GraphQL. It uses arweave-js to upload images directly to arweave.

Anytime you see window.arweaveWallet in the code, know that it's coming from the installed Arconnect wallet in the browser. You don't need to install anything via npm to have access to arweaveWallet.

## Wallet Address

Once connected, the user's Arconnect wallet address is passed as props to the Gallery component from App.js, just FYI.

## GraphQL Query

The query used to get image data from Arweave can be seen in the gallery component. This query filters all transactions by the connected wallet address which also have the tags with a Content-Type of image/png. Any image uploaded using SnapShrine will have this tag added automatically.

If you have any questions about this code or implementing it, please contact me via Twitter @shuaidavidkong
