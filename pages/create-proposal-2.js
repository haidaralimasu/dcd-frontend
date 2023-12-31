import Head from 'next/head'

export default function CreateProposalPage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <main>
    <section className='perposal_form__wrapper position-relative pt-5 pb-5' style={{backgroundImage: `url(assets/perposal-banner.png)`}}>
        <div className='g_6 perposal_form__graindaint position-absolute w-100 h-100 top-0 left-0' />
          <div className='container pt-5 position-relative z-3'>

          <form className='perposal_form perposal_form_md'>
            <h3 className='text-center mb-4'>lets the person input details of a new proposal</h3>

            <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group mb-3'>
                        <select className='form-control form-select' placeholder='Proposal Category'>
                            <option value="" disabled selected>Proposal Category</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                            <option>Category 4</option>
                            <option>Category 5</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group mb-3'>
                        <select className='form-control form-select' placeholder='Vote Type'>
                        <option value="" disabled selected>Vote Type</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                            <option>Category 4</option>
                            <option>Category 5</option>
                        </select>
                    </div>
                </div>
            </div>



            <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group mb-3'>
                        <input className='form-control' type="text" placeholder='Proposal Title' />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group mb-3'>
                        <input className='form-control' type="date" placeholder='Start Date' />
                    </div>
                </div>
            </div>

           


            <div className='form-group mb-3'>
                <select className='form-control form-select' placeholder='Discussion Link'>
                    <option value="" disabled selected>Discussion Link</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                    <option>Category 5</option>
                </select>
            </div>


            <div className='form-group mb-3'>
                <textarea className='form-control' placeholder='Description' rows={6} />
            </div>


            <div className='text-center'>
                <button className='btn btn-graidiant'>Submit</button>
            </div>


        </form>
          </div>
        </section>
    </main>
    </>
  )
}
