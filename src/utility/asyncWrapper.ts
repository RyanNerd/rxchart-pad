/**
 * A functional wrapper around async/await
 * @link https://dev.to/dewaldels/javascript-async-await-wrapper-22ao
 * @param {Promise<any>} function_ Function to be wrapped
 */
export const asyncWrapper = async <T>(function_: Promise<T>) => {
    try {
        const data = await function_;
        return [null, data];
    } catch (error) {
        return [error, null];
    }
};
