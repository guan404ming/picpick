import React from 'react';
export default function SavesPage() {
    return (
        <div className="card w-[350px]">
          <div className="card-header">
            <h2 className="card-title">Create project</h2>
            <p className="card-description">Deploy your new project in one-click.</p>
          </div>
          <div className="card-content">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="framework">Framework</label>
                  <select id="framework">
                    <option value="" disabled selected>Select</option>
                    <option value="next">Next.js</option>
                    <option value="sveltekit">SvelteKit</option>
                    <option value="astro">Astro</option>
                    <option value="nuxt">Nuxt.js</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer flex justify-between">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Deploy</button>
          </div>
        </div>
      );
  
} 
