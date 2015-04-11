//
//  DDPClient.h
//  AwesomeProject
//
//  Created by Harrison Harnisch on 4/7/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <ObjectiveDDP/MeteorClient.h>

@interface DDPClient : NSObject <RCTBridgeModule> {
  MeteorClient *meteorClient;
}

@property (nonatomic, retain) MeteorClient *meteorClient;
@end
