# FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# WORKDIR /app
# EXPOSE 80
# EXPOSE 443

# FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
# WORKDIR /src
# COPY ["net-finance-api/net-finance-api.csproj", "net-finance-api/"]
# RUN dotnet restore "DemoNetCoreWebAPI/DemoNetCoreWebAPI.csproj"
# COPY . .
# WORKDIR "/net-finance-api/net-finance-api"
# RUN dotnet build "net-finance-api.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "net-finance-api.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "net-finance-api.dll"]



# FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-image
# WORKDIR /src/net-finance-api/net-finance-api
# COPY *.csproj ./
# RUN dotnet restore
# COPY . ./
# RUN dotnet publish -c Release -o out
# FROM mcr.microsoft.com/dotnet/aspnet:5.0
# WORKDIR /app
# EXPOSE 80
# COPY --from=build-image /src/out ./
# ENTRYPOINT ["dotnet", "net-finance-api.dll"]

 FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
 WORKDIR /app
 EXPOSE 80
 FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
 WORKDIR /src
 COPY ["net-finance-api.csproj", ""]
 RUN dotnet restore "./net-finance-api.csproj"
 COPY . .
 WORKDIR "/src/."
 RUN dotnet build "net-finance-api.csproj" -c Release -o /app/build
 FROM build AS publish
 RUN dotnet publish "net-finance-api.csproj" -c Release -o /app/publish
 FROM base AS final
 WORKDIR /app
 COPY --from=publish /app/publish .
 ENTRYPOINT ["dotnet", "net-finance-api.dll"]



# FROM node:16-alpine 
 
# WORKDIR /app

# COPY . .

# RUN npm ci 

# RUN npm run build

# ENV NODE_ENV production

# EXPOSE 3000

# CMD [ "npx", "serve", "build" ]