//
//  DDPClient.m
//  AwesomeProject
//
//  Created by Harrison Harnisch on 4/7/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTBridge.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"

#import "DDPClient.h"
#import "ObjectiveDDP.h"
#import <ObjectiveDDP/MeteorClient.h>

@implementation DDPClient

@synthesize meteorClient;

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

- (void)connectWithURL:(NSString *)URLString {
  RCT_EXPORT();
  self.meteorClient = [[MeteorClient alloc] initWithDDPVersion:@"1"];
  ObjectiveDDP *ddp = [[ObjectiveDDP alloc] initWithURLString:URLString delegate:self.meteorClient];
  self.meteorClient.ddp = ddp;
  [self.meteorClient.ddp connectWebSocket];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(reportConnection)
                                               name:MeteorClientDidConnectNotification
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(reportDisconnection)
                                               name:MeteorClientDidDisconnectNotification
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(added:)
                                               name:@"added"
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(changed:)
                                               name:@"changed"
                                             object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(removed:)
                                               name:@"removed"
                                             object:nil];
}

- (void)subscribe:(NSString *)name {
  RCT_EXPORT();
  [self.meteorClient addSubscription:name];
}

- (void)added:(NSNotification *)notification {
  NSDictionary *added = notification.userInfo;
  [_bridge.eventDispatcher sendDeviceEventWithName:@"added"
                                           body:added];
}

- (void)changed:(NSNotification *)notification {
  NSDictionary *changed = notification.userInfo;
  [_bridge.eventDispatcher sendDeviceEventWithName:@"changed"
                                              body:changed];
}

- (void)removed:(NSNotification *)notification {
  NSDictionary *removed = notification.userInfo;
  [_bridge.eventDispatcher sendDeviceEventWithName:@"removed"
                                              body:removed];
}

- (void)reportConnection {
  NSLog(@"Meteor Client: connected");
}

- (void)reportDisconnection {
  NSLog(@"Meteor Client:  disconnected");
}

@end
