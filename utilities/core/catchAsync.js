/**
 * @file This file is responsible for handling asyn operations
 * @author Gabriel <gabrielsonchia@gmail.com> <29/05/2021 02:37am>
 * @since 1.0.0
 *  Last Modified: Gabriel <gabrielsonchia@gmail.com> <31/05/2021 07:12pm>
 */

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
