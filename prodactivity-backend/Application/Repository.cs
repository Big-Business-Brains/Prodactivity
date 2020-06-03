using System;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;

namespace prodactivity 
{
	public abstract class Repository<T> where T: class
	{
		
		DatabaseContext _databaseContext;
		private readonly IMapper _mapper;

		public Repository(DatabaseContext databaseContext, IMapper mapper) 
		{
			_databaseContext = databaseContext;
			_mapper = mapper;
		}

		public T Retrieve(Guid id)
		{
			return _databaseContext.Set<T>().Find(id);
		}

		public U Retrieve<U>(Guid id) where U: class
		{
			var retrievedObject = _databaseContext.Set<T>().Find(id);
			return _mapper.Map<U>(retrievedObject);
		}

        public List<T> RetrieveAll()
		{
			return _databaseContext.Set<T>().ToList();
		}

        public List<U> RetrieveAll<U>() where U: class
		{
			var retrievedObject = _databaseContext.Set<T>().ToList();
			return _mapper.Map<List<U>>(retrievedObject);
		}

		public void Create(T item) {
			_databaseContext.Add<T>(item);
			_databaseContext.SaveChanges();
		}

		public void Update(T item)
		{
			_databaseContext.Update<T>(item);
			_databaseContext.SaveChanges();
		}

		public void Delete(T item)
		{
			_databaseContext.Remove<T>(item);
			_databaseContext.SaveChanges();
		}
	}
}