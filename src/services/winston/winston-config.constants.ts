import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const { transports, format } = winston;

export const winstonConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new transports.File({
      dirname: 'logs',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};
