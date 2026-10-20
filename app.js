const games = [
  {title:'Subnautica',app:264710,category:'Adventure',filter:['adventure','survival'],tag:'Deep dive',description:'Crash-land on an ocean planet and explore what waits beneath the waves.',trailer:'CWyaXGmA25s'},
  {title:'DAVE THE DIVER',app:1868140,category:'Cozy & casual',filter:['cozy','adventure'],tag:'Day & night',description:'Explore the Blue Hole by day, then serve up the catch at night.',trailer:'P3ZsbGrCQ58'},
  {title:'DREDGE',app:1562430,category:'Mystery',filter:['mystery','adventure'],tag:'Strange tides',description:'Fish a remote archipelago and uncover secrets beneath the surface.',trailer:'kfniX3fH1l0'},
  {title:'ABZÛ',app:384190,category:'Adventure',filter:['adventure','cozy'],tag:'Ocean dream',description:'Sink into a vivid underwater world full of life and quiet wonder.',trailer:'qopIFtn0vBo'},
  {title:'Maneater',app:629820,category:'Action RPG',filter:['adventure','survival'],tag:'Shark story',description:'Grow from a small shark pup into the ocean’s apex predator.',trailer:'2UIc5hRNSwk'},
  {title:'Stranded Deep',app:313120,category:'Survival',filter:['survival','adventure'],tag:'Island castaway',description:'Survive the Pacific, craft what you need, and find a way home.',trailer:'PS9v1rh7CfY'},
  {title:'Sea of Thieves',app:1172620,category:'Action-adventure',filter:['adventure','aaa'],tag:'Pirate adventure',description:'Sail a shared pirate world, hunt treasure, and make your own legend.',trailer:'rD974R24J-4'},
  {title:'Horizon Forbidden West',app:2420110,category:'Action-adventure',filter:['adventure','aaa'],tag:'AAA adventure',description:'Join Aloy on an epic journey across a dangerous, machine-filled frontier.',trailer:'XLZN63UxAOM'},
  {title:'UNCHARTED: Legacy of Thieves',app:1659420,category:'Action-adventure',filter:['adventure','aaa'],tag:'Blockbuster story',description:'Join Nathan Drake and Chloe Frazer on two cinematic treasure hunts.',trailer:'xeMA3O9pfiY'},
  {title:'God of War',app:1593500,category:'Action-adventure',filter:['adventure','aaa'],tag:'Mythic journey',description:'Travel through Norse realms with Kratos and Atreus in a personal epic.',trailer:'HqQMh_tij0c'},
  {title:'Tomb Raider',app:203160,category:'Action-adventure',filter:['adventure','aaa'],tag:'Origin story',description:'Survive a hostile island and follow Lara Croft’s first great adventure.',trailer:'8ndhidEmUbI'},
  {title:'The Witcher 3: Wild Hunt',app:292030,category:'Open-world RPG',filter:['adventure','aaa'],tag:'Legendary RPG',description:'Track a child of prophecy across a vast world of monsters and choices.',trailer:'xPiqRR5tPMI'},
  {title:'ELDEN RING',app:1245620,category:'Action RPG',filter:['adventure','aaa','rpg'],tag:'Open-world epic',description:'Explore the Lands Between and face formidable foes in a dark fantasy world.',trailer:'E3Huy2cdih0'},
  {title:"Baldur's Gate 3",app:1086940,category:'RPG · Strategy',filter:['adventure','aaa','rpg'],tag:'Your story, your choices',description:'Gather a party and shape a rich fantasy adventure with every choice you make.',trailer:'OcP0WdH7rTs'},
  {title:'Red Dead Redemption 2',app:1174180,category:'Action-adventure',filter:['adventure','aaa'],tag:'Wild frontier',description:'Ride with Arthur Morgan through a vast, beautifully realized American frontier.',trailer:'HVRzx17WHVk'},
  {title:'Cyberpunk 2077',app:1091500,category:'Open-world RPG',filter:['adventure','aaa','rpg'],tag:'Neon city',description:'Make your way through Night City in a story-driven open-world RPG.',trailer:'UnA7tepsc7s'},
  {title:'Valheim',app:892970,category:'Survival · RPG',filter:['survival','adventure','rpg'],tag:'Viking saga',description:'Explore a Norse-inspired world, build a home, and take on mythical creatures.',trailer:'BSrJRrlVQII'},
  {title:'The Forest',app:242760,category:'Survival horror',filter:['survival','adventure','mystery'],tag:'Lost in the woods',description:'Survive a remote forest, build shelter, and uncover what lurks beneath it.',trailer:'7mwn5U2PNvk'},
  {title:'Sons Of The Forest',app:1326470,category:'Survival horror',filter:['survival','adventure','mystery'],tag:'Island survival',description:'Search a remote island for a missing billionaire and fight to stay alive.',trailer:'BLAHB7VYnG4'},
  {title:'Raft',app:648800,category:'Ocean survival',filter:['survival','adventure'],tag:'Survive at sea',description:'Gather supplies, expand your raft, and explore the ocean with friends.',trailer:'Lx3u0CB3soI'},
  {title:'Stardew Valley',app:413150,category:'Cozy · Simulation',filter:['cozy'],tag:'A fresh start',description:'Build a new life on the farm, meet the locals, and make the valley your own.',trailer:'ot7uXNQskhs'},
  {title:'Portal 2',app:620,category:'Puzzle · Adventure',filter:['puzzle','adventure'],tag:'Think with portals',description:'Solve clever portal puzzles and uncover the secrets of Aperture Science.',trailer:'tax4e4hBBZc'}
];

const grid = document.querySelector('#games');
if (grid) {
  const search = document.querySelector('#game-search');
  const suggestions = document.querySelector('#search-suggestions');
  const emptyState = document.querySelector('.empty-state');
  const recentContainer = document.querySelector('#recent-games');
  const recentStorageKey = 'aquarium-store-recent-games';
  let activeFilter = 'all';
  let recentIds = [];
  try {
    const savedRecent = JSON.parse(localStorage.getItem(recentStorageKey) || '[]');
    if (Array.isArray(savedRecent)) recentIds = savedRecent.map(Number).filter(id => games.some(game => game.app === id)).slice(0, 6);
  } catch {}

  const renderRecent = () => {
    if (!recentContainer) return;
    const recentGames = recentIds.map(id => games.find(game => game.app === id)).filter(Boolean);
    if (!recentGames.length) {
      recentContainer.innerHTML = '<div class="recent-empty"><span>〰</span><strong>No recent dives yet</strong><small>Choose a game card and it will show up here.</small></div>';
      return;
    }
    recentContainer.innerHTML = recentGames.map(game => `
      <a class="recent-game" href="https://store.steampowered.com/app/${game.app}/" target="_blank" rel="noopener noreferrer" aria-label="Open ${game.title} on Steam">
        <img src="https://cdn.akamai.steamstatic.com/steam/apps/${game.app}/header.jpg" alt="" loading="lazy" onerror="this.onerror=null;this.src='https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app}/header.jpg'">
        <span class="recent-game-copy"><strong>${game.title}</strong><small>${game.category}</small></span><span class="recent-game-arrow">↗</span>
      </a>`).join('');
  };

  grid.addEventListener('click', event => {
    const card = event.target.closest('.game-card');
    if (!card) return;
    const appId = Number(card.dataset.app);
    recentIds = [appId, ...recentIds.filter(id => id !== appId)].slice(0, 6);
    try { localStorage.setItem(recentStorageKey, JSON.stringify(recentIds)); } catch {}
    renderRecent();
  });
  document.querySelector('#clear-recent')?.addEventListener('click', () => {
    recentIds = [];
    try { localStorage.removeItem(recentStorageKey); } catch {}
    renderRecent();
  });

  const updateSuggestions = () => {
    const query = (search?.value || '').trim().toLowerCase();
    if (!suggestions || !query) {
      if (suggestions) suggestions.hidden = true;
      search?.setAttribute('aria-expanded', 'false');
      return;
    }
    const matches = games
      .filter(game => `${game.title} ${game.category} ${game.description} ${game.tag}`.toLowerCase().includes(query))
      .sort((a, b) => Number(b.title.toLowerCase().startsWith(query)) - Number(a.title.toLowerCase().startsWith(query)))
      .slice(0, 5);
    suggestions.replaceChildren();
    matches.forEach(game => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'search-suggestion';
      option.setAttribute('role', 'option');
      option.innerHTML = `<span class="suggestion-icon">⌕</span><span><strong></strong><small></small></span><span class="suggestion-arrow">↗</span>`;
      option.querySelector('strong').textContent = game.title;
      option.querySelector('small').textContent = game.category;
      option.addEventListener('click', () => {
        search.value = game.title;
        render();
        updateSuggestions();
        search.focus();
        grid.querySelector('.game-card')?.scrollIntoView({behavior:'smooth', block:'center'});
      });
      suggestions.append(option);
    });
    suggestions.hidden = matches.length === 0;
    search?.setAttribute('aria-expanded', String(matches.length > 0));
  };

  const render = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const filtered = games.filter(game => {
      const matchesFilter = activeFilter === 'all' || game.filter.includes(activeFilter);
      const matchesSearch = `${game.title} ${game.category} ${game.description} ${game.tag}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    grid.innerHTML = filtered.map(game => {
      const steamUrl = `https://store.steampowered.com/app/${game.app}/`;
      const trailerUrl = `https://www.youtube.com/watch?v=${game.trailer}`;
      return `<article class="game-card" data-app="${game.app}">
        <div class="game-image-wrap">
          <img class="game-image" src="https://cdn.akamai.steamstatic.com/steam/apps/${game.app}/header.jpg" alt="${game.title} artwork from Steam" loading="lazy" onerror="this.onerror=null;this.src='https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app}/header.jpg'">
          <span class="card-badge">${game.tag}</span>
          <div class="card-actions"><a class="icon-action" href="${trailerUrl}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${game.title} trailer on YouTube" title="Watch trailer">▶</a><a class="icon-action" href="${steamUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${game.title} on Steam" title="View on Steam">↗</a></div>
        </div>
        <div class="game-info"><div class="game-meta"><span>${game.category}</span><span class="game-rating">✦&nbsp; STEAM PICK</span></div><h3>${game.title}</h3><p>${game.description}</p><div class="card-bottom"><span class="price">See Steam price</span><a class="steam-buy" href="${steamUrl}" target="_blank" rel="noopener noreferrer">BUY ON STEAM&nbsp; ↗</a></div></div>
      </article>`;
    }).join('');
    emptyState.hidden = filtered.length > 0;
  };

  document.querySelectorAll('.filter-chip').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.filter-chip.active')?.classList.remove('active');
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      render();
    });
  });
  search?.addEventListener('input', () => {
    render();
    updateSuggestions();
  });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search?.focus();
    }
    if (event.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      render();
      updateSuggestions();
      search.blur();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.search-wrap')) {
      if (suggestions) suggestions.hidden = true;
      search?.setAttribute('aria-expanded', 'false');
    }
  });
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-link.active')?.classList.remove('active');
      link.classList.add('active');
    });
  });
  renderRecent();
  render();
}

const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, {passive:true});
}

const brandLetters = document.querySelectorAll('.frame-brand-word span');
brandLetters.forEach(letter => {
  letter.style.setProperty('--letter-speed', `${(2.8 + Math.random() * 3.8).toFixed(2)}s`);
  letter.style.setProperty('--letter-delay', `${(-Math.random() * 5.5).toFixed(2)}s`);
});
const rayLogo = document.querySelector('.ray-logo');
if (rayLogo) {
  rayLogo.style.setProperty('--ray-speed', `${(4.2 + Math.random() * 2.8).toFixed(2)}s`);
  rayLogo.style.setProperty('--ray-delay', `${(-Math.random() * 5).toFixed(2)}s`);
}
