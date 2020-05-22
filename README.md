# Prodactivity-Frontend
This is the repository for the frontend React Native application of ProdActivity. A gamified productivity app that encourages users to keep active by rewarding their progress. The backend repository can be found [here](https://github.com/rileydnorris/Prodactivity-Backend).

## Build Instructions
The [React Native docs](https://reactnative.dev/docs/environment-setup) give full instructions on setting up React Native on macOS or Windows, instructions on macOS setup are below.

1. Install Node and Watchman
```
brew install node
brew install watchman
```
2. For iOS development, install Xcode from the Mac App Store and this will download compilation tools and simulators for you
3. You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.
4. To use iOS dependencies, you will need CocoaPods
```
sudo gem install cocoapods
```
5. Install the project's dependencies from Node
```
npm install
```
6. Run the application either through the debug menu in VS Code, or using the following command
```
npx react-native run-ios
```

To run on a real device, you can view instructions [here](https://reactnative.dev/docs/running-on-device)
