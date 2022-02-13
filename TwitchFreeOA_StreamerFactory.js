/*
This is the free oa of twitch(after this oa, they will consider your resume)
Problem:
Every month, there are millions of streamers who stream in a variety of different categories. For this challenge, you’ll be working on writing a data structure that will be storing the name of streamers streaming, the number of views they currently have, as well as the category they are streaming in.

The initial input of streamer information will come as a list of strings:

Example: [Ninja, 100000, Fortnite, Pokimane, 40000, Valorant]

This is interpreted as Ninja has 100,000 views and is streaming Fortnite, and Pokimane has 40000 views and is streaming Valorant. The names of the streamers will be unique. You will not be given any negative numbers for view counts.

You will also be given a list of commands, that will manipulate the streamer data or require output:

(All Examples are based on the original input above)

StreamerOnline - Add a new streamer to the data structure. The name will be unique. Example Input: StreamerOnline, AOC, 75000, Just Chatting -> [Ninja, 100000, Fortnite, Pokimane, 40000, Valorant, AOC, 75000, Just Chatting ]

UpdateViews - Update the views of a streamer name, who is streaming in the respective category, to the provided number of views. Example Input: UpdateViews, Ninja, 120000, Fortnite -> Update Ninjas viewer count to 120,000 If the streamer is not streaming within that category, this command can be ignored.

UpdateCategory - Update the category of a streamer name, who is streaming in the respective category, to the provided category. Example Input: UpdateCategory, Ninja, Fortnite, Warzone -> Update Ninjas category to Warzone If the streamer is not streaming within that category, this command can be ignored.

StreamerOffline - Remove the streamer from the data structure, if they are streaming within the given category Example Input: StreamerOffline, Ninja, Fortnite -> [Pokimane, 40000, Valorant] only this data will exist within the data structure. If the streamer is not streaming within that category, this command can be ignored.

ViewsInCategory - Returns the amount of viewers watching a certain category. Returns 0 if category does not exist. Example Input: ViewsInCategory, Fortnite -> 100000 as Ninja is the only streamer within the category

TopStreamerInCategory - Returns the streamer with the highest view count in a certain category. Returns null if the category does not exist or there is nobody currently streaming in the category. Example Input: TopStreamerInCategory, Valorant -> Pokimane as Pokimane is the only streamer within the category

TopStreamer - Returns the streamer with the highest view count currently streaming. Returns null if there is nobody currently streaming. Example Inputs: TopStreamer -> Ninja as Ninja has the highest view count.

These commands will be strung together, for example:

StreamerOnline, Bugha, 75000, Fortnite, StreamerOnline, Tenzo, 30000, Valorant, ViewsInCategory, Fortnite, TopStreamerInCategory, Valorant

Expected Return: [175000, Pokimane]

*/

// Solution(Passed 6 test case, but not sure whether it is the correct/best one)
function test(streamerInformation, commands) {
  // Please write your code here.
  const StreamFactory = {
      data: {},
      result: [],
      StreamerOnline: (info) => {
        for (let i = 0; i < info.length; i = i + 3) {
          const streamer = info[i]
          const views = parseInt(info[i + 1]);
          const cate = info[i + 2];
          if (!StreamFactory.data[cate]) {
            StreamFactory.data[cate] = {};
          }

          if (!StreamFactory.data[cate][streamer]) {
            StreamFactory.data[cate][streamer] = 0
          }

          StreamFactory.data[cate][streamer] = views;
        }
      },
      UpdateViews: (streamer, views, cate) => {
        if (!StreamFactory.data[cate]) {
          StreamFactory.data[cate] = {};
        }

        if (!StreamFactory.data[cate][streamer]) {
          return;
        }
        StreamFactory.data[cate][streamer] = parseInt(views);
      },
      UpdateCategory: (streamer, cate1, cate2) => {
        if (!StreamFactory.data[cate1]) {
          return;
        }
        if (!StreamFactory.data[cate2]) {
          StreamFactory.data[cate2] = {};
        }
        StreamFactory.data[cate2][streamer] = StreamFactory.data[cate1][streamer]
        StreamFactory.data[cate1][streamer] = null;
      },
      StreamerOffline: (streamer, cate) => {
        if (StreamFactory.data[cate] && StreamFactory.data[cate][streamer])
          StreamFactory.data[cate][streamer] = null;
      },
      ViewsInCategory: (cate) => {
        let res = 0
        if (StreamFactory.data[cate]) {
          for (let streamer in StreamFactory.data[cate]) {
            res += StreamFactory.data[cate][streamer];
          }
        }
        StreamFactory.result.push(res)
      },
      TopStreamerInCategory: (cate) => {
        let res = null;
        let amount = -1
        if (StreamFactory.data[cate]) {
          for (let streamer in StreamFactory.data[cate]) {
            if (amount < StreamFactory.data[cate][streamer]) {
              amount = StreamFactory.data[cate][streamer];
              res = streamer;
            }
          }
        }
        StreamFactory.result.push(res)
      },
      TopStreamer: () => {
        let amount = -1;
        let res = null;
        for (let cate in StreamFactory.data) {
          let eachAmount = 0;
          let eachRes = null;
          for (let streamer in StreamFactory.data[cate]) {
            if (eachAmount < StreamFactory.data[cate][streamer]) {
              eachAmount = StreamFactory.data[cate][streamer];
              eachRes = cate;
            }
          }
          if (eachAmount > amount) {
            amount = eachAmount;
            res = eachRes;
          }
        }
        StreamFactory.result.push(res);
      },
    }
    // init
  StreamFactory.StreamerOnline(streamerInformation);
  console.log(StreamFactory.data);
  // run commands
  let i = 0
  while (i < commands.length) {
    if (commands[i] == 'StreamerOnline') {
      StreamFactory.StreamerOnline([commands[i + 1], parseInt(commands[i + 2]), commands[i + 3]]);
      i = i + 4;
    } else if (commands[i] == 'UpdateViews') {
      StreamFactory.UpdateViews(commands[i + 1], parseInt(commands[i + 2]), commands[i + 3]);
      i = i + 4;
    } else if (commands[i] == 'UpdateCategory') {
      StreamFactory.UpdateCategory(commands[i + 1], commands[i + 2], commands[i + 3]);
      i = i + 4;
    } else if (commands[i] == 'StreamerOffline') {
      StreamFactory.StreamerOffline(commands[i + 1], commands[i + 2]);
      i = i + 3;
    } else if (commands[i] == 'ViewsInCategory') {
      StreamFactory.ViewsInCategory(commands[i + 1]);
      i = i + 2;
    } else if (commands[i] == 'TopStreamerInCategory') {
      StreamFactory.TopStreamerInCategory(commands[i + 1]);
      i = i + 2;
    } else if (commands[i] == 'TopStreamer') {
      StreamFactory.TopStreamer();
      i = i + 1;
    }
  }
  return StreamFactory.result;
}
console.log(test(["Ninja", "100000", "Fortnite", "Pokimane", "40000", "Valorant"], ["TopStreamer"]));
