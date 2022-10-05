import { CommandObject } from "arcybot";

import { CacheOption } from "types";
import { mongo, cache } from "fetus";

export const getCommandsFromAPI = async () => {
  const cursor = mongo.dbs[cache.mainDb]
    .collection<CommandObject>("commands")
    .find();
  const commands: CommandObject[] = [];
  await cursor.forEach(el => {
    if (!el.legacy) commands.push(el);
  });
  return commands;
};

export const getAllOptionsFromAPI = async () => {
  const cursor = mongo.dbs[cache.mainDb]
    .collection<CacheOption>("options")
    .find();
  const options: CacheOption[] = [];
  await cursor.forEach(el => {
    options.push(el);
  });
  return options;
};
