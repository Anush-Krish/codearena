const paginationParser = (req, res, next) => {
    const {page = 1, limit = 10} = req.query;

    req.pagination = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    next();
};

module.exports = paginationParser;
  