<?php

namespace JuRibyBundle\Services;

use Symfony\Component\Finder\Finder;
use Symfony\Component\Yaml\Yaml;

class Projects
{
    private $finder;

    /**
     * Projects constructor
     *
     * @param string $finder The project folder location
     */
    public function __construct($finder, $folder)
    {
        $this->finder = $finder;
        $this->finder->in(__DIR__ . '/../' . $folder);
    }

    /**
     * Load the projects from the project folder
     *
     * @param integer $id The project ID to get or null to get all the projects
     */
    public function load($id = 0)
    {
        $projects = array();
        foreach ($this->finder->files('project_*') as $file) {
            $filename = $file->getFilename();
            if (!$id || 'project_' . $id . '.yml' === $filename) {
                $projects[] = Yaml::parse(file_get_contents($file->getRealPath()))['project'];
            }
        }

        if (count($projects) > 1) {
            usort($projects, function ($p1, $p2) {
                return $p1['number'] > $p2['number'];
            });
        }

        return $projects;
    }
}
