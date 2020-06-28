using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace prodactivity
{
	public class APIResponse
	{
        public object Result { get; }
        public string Message { get; }

        public APIResponse(object result, string message = null)
        {
            Result = result;
            Message = message;
        }

        public APIResponse(string message)
        {
            Message = message;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
	}
}
