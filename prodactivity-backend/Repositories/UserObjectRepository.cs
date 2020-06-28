using System;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace prodactivity
{
    /// <summary>
    /// Repository for accessing elements in the database that conform to BaseObject.
    /// This means the elements have an Id and UserId field
    /// </summary>
    /// <typeparam name="T">The type of the object to retrieve</typeparam>
    public abstract class UserObjectRepository<T> : BaseRepository<T> where T : UserObject
    {
        DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public UserObjectRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext, mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public List<T> RetrieveAllByUserId(Guid userId)
        {
            return RetrieveByExpression(i => i.UserId == userId);
        }

        public List<U> RetrieveAllByUserId<U>(Guid userId) where U : class
        {
            return RetrieveByExpression<U>(i => i.UserId == userId);
        }
    }
}