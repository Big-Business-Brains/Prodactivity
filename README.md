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
5. Install the iOS dependencies
```
cd ios && pod install
```
6. Install the project's dependencies from Node
```
npm install
```
7. Run the application either through the debug menu in VS Code, or using the following command
```
npx react-native run-ios
```

To run on a real device, you can view instructions [here](https://reactnative.dev/docs/running-on-device)



# Prodactivity - Backend
This is the repository for the backend .NET Core application of Prodactivity: A gamified productivity app that encourages users to keep active by rewarding their progress. The frontend repository can be found [here](https://github.com/rileydnorris/Prodactivity-Frontend).

## Build Instructions
Full instructions on how to install .NET Core and setup in VS Code can be found [here](https://docs.microsoft.com/en-us/dotnet/core/tutorials/using-on-macos)

1. Clone the repo to your local machine
2. Navigate to the project in your Terminal
3. Install .NET Core 3.1 SDK from [Microsoft's website](https://dotnet.microsoft.com/download)
3. Restore the project and ensure dependencies are added properly
```
dotnet restore
```
4. Build and run the project by pressing the "Run" button in the debug menu in VS Code or run the command below
```
dotnet run
```

## Documentation
Documentation is generated using [NSwag](https://github.com/RicoSuter/NSwag) for [Swagger](https://swagger.io/) documentation.

To view the documentation:
1. Build and run the project by pressing the "Run" button in the debug menu in VS Code or run the command below
```
dotnet run
```
2. Go to `localhost:5001/swagger` in your browser
