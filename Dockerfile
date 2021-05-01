FROM beevelop/java

# Creating a new user
ARG USER=docker
ARG UID=1000
ARG GID=1000
ARG PW=docker

# Getting this from compose file
ARG APP_NAME
ARG GRADLE_VERSION
ARG ANDROID_BUILD_TOOLS_VERSION
ARG ANDROID_APIS 
ARG CORDOVA_VERSION

RUN apt-get update && \
    apt-get -y install sudo
RUN useradd -m ${USER} --uid=${UID} && echo "${USER}:${PW}" | \
    chpasswd && adduser ${USER} sudo

# Android requirements versions
ARG ANDROID_SDK_URL="https://dl.google.com/android/repository/tools_r25.2.5-linux.zip"
ARG ANDROID_CMDTOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip"

# Cordova version and nodejs version
ARG NODEJS_VERSION=10.16.3

# Enviroment variables to build apks
ENV ANT_HOME="/usr/share/ant" \
    MAVEN_HOME="/usr/share/maven" \
    GRADLE_HOME="/usr/share/gradle" \
    ANDROID_SDK_ROOT="/opt/android" \
    ANDROID_HOME="/opt/android"

ENV PATH $PATH:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/build-tools/$ANDROID_BUILD_TOOLS_VERSION:$ANT_HOME/bin:$MAVEN_HOME/bin:$GRADLE_HOME/gradle-${GRADLE_VERSION}/bin

WORKDIR /opt
RUN dpkg --add-architecture i386 && \
    apt-get -qq update && \
    apt-get -qq install -y wget curl maven ant unzip libncurses5:i386 libstdc++6:i386 zlib1g:i386 && \
    # Installs Android SDK
    mkdir android && cd android && \
    wget -O tools.zip ${ANDROID_SDK_URL} && \
    unzip tools.zip && rm tools.zip && \
    echo y | android update sdk -a -u -t platform-tools,${ANDROID_APIS},build-tools-${ANDROID_BUILD_TOOLS_VERSION} && \
    chmod a+x -R $ANDROID_SDK_ROOT && \
    chown -R root:root $ANDROID_SDK_ROOT && \
    # Clean up
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y && \
    apt-get clean

# Installing a specific Gradle vesion
RUN wget https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp &&\
    unzip -d ${GRADLE_HOME} /tmp/gradle-${GRADLE_VERSION}-bin.zip && \
    rm /tmp/gradle-${GRADLE_VERSION}-bin.zip


# Installing sdkmanager to accept licenses
RUN \
    wget ${ANDROID_CMDTOOLS_URL} && \
    unzip commandlinetools-linux-6858069_latest.zip && \
    mv cmdline-tools /usr/local/commandlinetools && \
    export PATH=$PATH:/usr/local/commandlinetools/bin && \
    yes | sdkmanager --licenses --sdk_root=${ANDROID_SDK_ROOT}

# Installing nodejs
ENV PATH=$PATH:/opt/node/bin
WORKDIR "/opt/node"
RUN apt-get update && apt-get install -y curl git ca-certificates --no-install-recommends && \
    curl -sL https://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}-linux-x64.tar.gz | tar xz --strip-components=1 && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Installing Apache Cordova
WORKDIR "/tmp"
RUN npm i -g --unsafe-perm cordova@${CORDOVA_VERSION}
